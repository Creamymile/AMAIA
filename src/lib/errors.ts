export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "You must be logged in to perform this action") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message = "Invalid input",
    public errors?: Record<string, string[]>
  ) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409, "CONFLICT");
    this.name = "ConflictError";
  }
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export function handleActionError(error: unknown): ActionResult<never> {
  if (error instanceof ValidationError) {
    return {
      success: false,
      error: error.message,
      fieldErrors: error.errors,
    };
  }
  if (error instanceof AppError) {
    return { success: false, error: error.message };
  }
  console.error("Unexpected error:", error);
  return { success: false, error: "Something went wrong. Please try again." };
}
