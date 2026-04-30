import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, projectType, mobileNumber, message } = req.body;

  if (!name || !email || !projectType || !mobileNumber || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email environment variables');
      return res.status(500).json({ message: 'Server configuration error: Missing email credentials' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    await transporter.verify();
    console.log('Transporter verified successfully');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'waghpawan9161@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}