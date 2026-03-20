"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn, formatRelativeTime, getInitials } from "@/lib/utils";
import { sendMessageAction } from "@/modules/orders/actions/order-message.actions";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  body: string;
  isSystemMessage: boolean;
  createdAt: Date;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface MessageThreadProps {
  orderItemId: string;
  currentUserId: string;
  messages: Message[];
}

export function MessageThread({
  orderItemId,
  currentUserId,
  messages: initialMessages,
}: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || isPending) return;

    const text = body.trim();
    setBody("");

    startTransition(async () => {
      const result = await sendMessageAction(orderItemId, text);
      if (result.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: result.data.id,
            senderId: currentUserId,
            body: text,
            isSystemMessage: false,
            createdAt: new Date(),
            sender: { id: currentUserId, name: "You", image: null },
          },
        ]);
      } else {
        toast.error(result.error);
        setBody(text);
      }
    });
  }

  return (
    <div className="flex flex-col rounded-xl border">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 max-h-[400px]">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId === currentUserId;
            if (msg.isSystemMessage) {
              return (
                <div key={msg.id} className="text-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {msg.body}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={msg.id}
                className={cn("flex gap-3", isOwn && "flex-row-reverse")}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={msg.sender.image ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {getInitials(msg.sender.name ?? "?")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2.5",
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      isOwn
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatRelativeTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t p-3"
      >
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message..."
          rows={1}
          className="min-h-[40px] max-h-[120px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" size="icon" disabled={!body.trim() || isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
