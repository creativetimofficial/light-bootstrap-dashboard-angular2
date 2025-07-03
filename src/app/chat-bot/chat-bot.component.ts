import { Component, OnInit ,Renderer2} from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  showChat = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized") {
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){
              window.chatbase.q=[]
            }
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){ return target.q }
              return (...args)=>target(prop,...args)
            }
          })
        }

        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="f0d3oyMrl3n7digplpnOD";
          script.setAttribute("chatbotId", "f0d3oyMrl3n7digplpnOD");
          document.body.appendChild(script);
        };

        if(document.readyState==="complete"){
          onLoad()
        }else{
          window.addEventListener("load",onLoad)
        }
      })();
    `;
    this.renderer.appendChild(document.body, script);
  }

  toggleChat(): void {
    const iframe = document.querySelector('iframe[src*="chatbase"]') as HTMLElement;
    if (iframe) {
      this.showChat = !this.showChat;
      iframe.style.display = this.showChat ? 'block' : 'none';
    }
  }
  
}
