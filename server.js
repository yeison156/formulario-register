const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // <--- Agregado
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/enviar-correo", async (req, res) => {
  const { email, password } = req.body;

  // Encriptar la contraseña antes de enviarla
  const hashedPassword = await bcrypt.hash(password, 10);

  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const mailOptions = {
    from: '"Formulario Web" <no-reply@example.com>',
    to: "destino@prueba.com",
    subject: "Nuevo registro recibido",
    html: `
      <p>📧 <strong>Email:</strong> ${email}</p>
      <p>🔐 <strong>Password (hash):</strong> ${hashedPassword}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado:", nodemailer.getTestMessageUrl(info));
    res.status(200).send("Correo con contraseña encriptada enviado correctamente");
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).send("Error al enviar correo");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
