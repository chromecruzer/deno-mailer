import { Handlers } from "$fresh/server.ts";
import { FreshContext } from "$fresh/server.ts";
import multer from "npm:multer@1.4.5-lts.1";
import nodemailer from "npm:nodemailer@6.9.0";

// Configure multer for file uploads
const upload = multer().single('file');

async function sendEmailWithAttachment(filename: string, content: Buffer) {
  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "amudhavamshi@gmail.com",
      pass: "tdxrctlczcvneudg",
    },
  });

  // Compose email
  const mailOptions = {
    from: "amudhavamshi@gmail.com",
    to: "floravirgin90@gmail.com",
    subject: "File Upload via Deno Server",
    text: "File attached.",
    attachments: [
      {
        filename,
        content,
      },
    ],
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  
    const formData = await _req.formData();
    const file = formData.get("file") as File;

    if (file) {
      const filename = file.name;
      const content = new Uint8Array(await file.arrayBuffer());
      await sendEmailWithAttachment(filename, content);
      return new Response("File uploaded successfully and sent via email.");
    } else {
      return new Response("No file uploaded.", { status: 400 });
    }
}

 
import chalk from "npm:chalk@5.3.0";

console.log(chalk.bgBlue(`hellow`))


 
