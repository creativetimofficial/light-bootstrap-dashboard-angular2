import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

declare var Email: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }
  form = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
  messageBox = document.getElementById('messageBox');

 showMessage(text, isError = false) {
  this.messageBox.textContent = text;
  this.messageBox.style.color = isError ? 'red' : 'green';
  this.messageBox.style.display = 'block';
}
emailInvalid = false;
messageText = '';
messageError = false;

isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

 sendEmail() {
  if (!this.isValidEmail(this.form.email)) {
    Swal.fire({
      icon: 'error',
      title: 'Email invalide',
      text: 'Veuillez entrer un email valide.',
    });
    return;
  }

  const serviceID = 'service_x3dvh7z';
  const template = 'template_al9cbrs';
  const publicKey = 'sDFgBbOfrGRnnhc0V';

  const templateParams = {
    from_name: this.form.name,
    from_email: this.form.email,
    message: this.form.message,
    to_name: 'Tunav Team',
    reply_to: this.form.email,
  };

  emailjs.send(serviceID, template, templateParams, publicKey)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé ✅',
        html: `
        <br><br>
        <strong>Un e-mail de confirmation automatique</strong> va vous être envoyé immédiatement.<br><br>
        <em>⚠️ Si vous ne le recevez pas dans quelques minutes, cela signifie que vous avez saisi une adresse e-mail inexistante ou incorrecte.</em>
      `,
      confirmButtonColor: '#3085d6'
      });

      this.form = { name: '', email: '', message: '' };
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'L\'adresse email est incorrecte .',
      });
      console.error(err);
    });
}



}
