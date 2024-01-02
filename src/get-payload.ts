import dotenv from "dotenv";
import path from "path";
import { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

let cachedPayload = (global as any).payload;
if (!cachedPayload) {
  cachedPayload = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is not defined");
  }

  if (cachedPayload.client) {
    return cachedPayload.client;
  }

  if (!cachedPayload.promise) {
    cachedPayload.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "chinzorig.otgonjargal@redpathmining.com",
        fromName: "Chinzorig",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (e: unknown) {
    cachedPayload.promise = null;
    throw e;
  }

  return cachedPayload.client;
};
