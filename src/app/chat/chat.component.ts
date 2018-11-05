import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
// import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { AuthenticationService } from '../_services';
import { appConfig } from '../app.config';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  constructor(
    // private socket: Socket,
    private router: Router,
    private _chatService: ChatService,
    private authUser: AuthenticationService,
  ) { }

  @ViewChild('chatContainer') chatContainer;

  messages: any[] = [];
  node: any;
  chatSocket: any;
  maxMessageLength: 20;


  ngOnDestroy () {
    this.chatSocket.close();
  }

  ngOnInit() {
    const cookie = this.authUser.getToken();
    this.node = JSON.parse(localStorage.getItem('node'))._id;
    this.chatSocket = new WebSocket(
        appConfig.wsUrl + '/chat/' + this.node + '/?' + this.authUser.getToken()
    );

    
    this._chatService.getMessages(this.node)
      .subscribe(
        messages => this.messages = messages
      );

    const currentThis = this;
    this.chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data).message;
      currentThis.messages.push(data);
    }

    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked () {
    
  }

  private onScroll (e) {
    if (e.target.scrollTop === 0 && this.messages.length > 0) {
      const olderMessages = [];
      this._chatService.getMessages(this.node, this.messages[0]._id)
      .subscribe(
        messages => {
          for ( let i = messages.length; i >= 0; i--) {
            if (messages[i] !== undefined) {
              this.messages.unshift(messages[i]);
            } 
          }
        }
      );
    }
  }

  private sendMessage (msg) {
    var data = {
      'content': msg,
      'sent_on': new Date()
    }

    this.chatSocket.send(JSON.stringify(data));
  }

}
