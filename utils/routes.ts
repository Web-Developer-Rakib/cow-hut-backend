import adminRouter from "../src/admin/admin.routes";
import authRouter from "../src/auth/auth.routes";
import cowRouter from "../src/cow/cow.routes";
import orderRouter from "../src/order/order.routes";
import userRouter from "../src/user/user.routes";

export const routes = [
  {
    router: userRouter,
    path: "users",
  },
  {
    router: cowRouter,
    path: "cows",
  },
  {
    router: orderRouter,
    path: "orders",
  },
  {
    router: adminRouter,
    path: "admins",
  },
  {
    router: authRouter,
    path: "auth",
  },
];
