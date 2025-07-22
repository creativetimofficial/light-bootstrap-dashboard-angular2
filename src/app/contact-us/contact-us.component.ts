import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';
import { EmailjsService } from 'emailJs/email.service';
import Swal from 'sweetalert2';

declare var Email: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private emailjsService: EmailjsService) { }
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
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    this.emailjsService.sendContactEmail(this.form)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé ✅',
          html: `
            <br><br>
           <strong>An automatic confirmation email</strong> will be sent to you immediately.<br><br>
          <em>⚠️ If you do not receive it within a few minutes, it means you entered a non-existent or incorrect email address.</em>
          `,
          confirmButtonColor: '#3085d6'
        });
        this.form = { name: '', email: '', message: '' };
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while sending.',
        });
      });
  }
}
