import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do List API",
      version: "1.0.0",
      description: "API for managing a to-do list application",
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local Development Server for Swagger",
      },
      {
        url: "https://your-production-server.com",
        description: "Production server (HTTPS)",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description:
          "Endpoints for user registration, login, logout, and user management.",
      },
      {
        name: "Tasks",
        description: "Endpoints for managing tasks.",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/api/signup": {
        post: {
          summary: "Create an account",
          tags: ["Authentication"],
          security: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    firstName: {
                      type: "string",
                      example: "Mugisha",
                    },
                    lastName: {
                      type: "string",
                      example: "Emmanuel",
                    },
                    email: {
                      type: "string",
                      example: "user@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "Password@123",
                    },
                  },
                  required: ["firstName", "lastName", "email", "password"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      email: { type: "string" },
                      token: { type: "string" },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request",
            },
          },
        },
      },
      "/api/login": {
        post: {
          summary: "Login to an account",
          tags: ["Authentication"],
          security: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "user@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "Password@123",
                    },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "User logged in successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      email: { type: "string" },
                      token: { type: "string" },
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/api/logout": {
        post: {
          summary: "Logout from an account",
          tags: ["Authentication"],
          responses: {
            200: {
              description: "User logged out successfully",
            },
          },
        },
      },
      "/api/users": {
        get: {
          summary: "Get all users",
          tags: ["Authentication"],
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/{id}": {
        get: {
          summary: "Get current user",
          tags: ["Authentication"],
          responses: {
            200: {
              description: "User details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
            404: {
              description: "User not found",
            },
          },
        },
        patch: {
          summary: "Update current user",
          tags: ["Authentication"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                  required: ["firstName","lastName","email", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "User updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          firstName: { type: "string" },
                          lastName: { type: "string" },
                          email: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request",
            },
            404: {
              description: "User not found",
            },
          },
        },
        delete: {
          summary: "Delete current user",
          tags: ["Authentication"],
          responses: {
            204: {
              description: "User deleted successfully",
            },
            404: {
              description: "User not found",
            },
          },
        },
      },
      "/api/tasks": {
        get: {
          summary: "Get all tasks",
          tags: ["Tasks"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "A list of tasks",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", example: 1 },
                        title: { type: "string", example: "Buy groceries" },
                        description: {
                          type: "string",
                          example: "Buy milk and bread",
                        },
                        completed: { type: "boolean", example: false },
                      },
                      required: ["id", "title", "description", "completed"],
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
        post: {
          summary: "Create a new task",
          tags: ["Tasks"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Buy groceries" },
                    description: {
                      type: "string",
                      example: "Buy milk and bread",
                    },
                  },
                  required: ["title", "description"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Task created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      description: { type: "string" },
                      completed: { type: "boolean" },
                    },
                    required: ["id", "title", "description", "completed"],
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            400: {
              description: "Bad Request",
            },
          },
        },
      },
      "/api/tasks/{id}": {
        patch: {
          summary: "Update a task",
          tags: ["Tasks"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "Buy groceries and vegetables",
                    },
                    description: {
                      type: "string",
                      example: "Buy milk, bread, and tomatoes",
                    },
                    completed: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Task updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      description: { type: "string" },
                      completed: { type: "boolean" },
                    },
                    required: ["id", "title", "description", "completed"],
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            404: {
              description: "Task not found",
            },
            400: {
              description: "Bad Request",
            },
          },
        },
        delete: {
          summary: "Delete a task",
          tags: ["Tasks"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Task deleted successfully",
            },
            401: {
              description: "Unauthorized",
            },
            404: {
              description: "Task not found",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);
export default specs;