import { auth } from "./src/lib/auth";

export { auth as middleware };

export const config = {
  matcher: ["/gyms", "/dashboard"], // Add other protected routes
};
