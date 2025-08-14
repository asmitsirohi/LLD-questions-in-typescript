// Chat Application

abstract class ChatElement {
  send(): string {
    return "";
  }
}

class TextElement implements ChatElement {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  send(): string {
    return this.text;
  }
}

class ImageElement implements ChatElement {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  send(): string {
    return this.path;
  }
}

class Chat {
  chatElement: ChatElement[];

  constructor() {
    this.chatElement = [];
  }

  addElement(element: ChatElement) {
    this.chatElement.push(element);
  }

  deleteElement(element: ChatElement) {
    this.chatElement = this.chatElement.filter(
      (ele) => ele.send() !== element.send()
    );
  }

  editElement(prev: ChatElement, next: ChatElement) {
    const idx = this.chatElement.findIndex((ele) => ele.send() === prev.send());
    this.chatElement.splice(idx, 1, next);
  }

  send() {
    let msgs = "";

    this.chatElement.forEach((element) => {
      msgs += element.send() + "\n";
    });

    return msgs;
  }
}

class ChatApplication {
  chat: Chat;

  constructor(chat: Chat) {
    this.chat = chat;
  }

  sendText(text: string) {
    this.chat.addElement(new TextElement(text));
  }

  sendImage(path: string) {
    this.chat.addElement(new TextElement(path));
  }

  deleteText(text: string) {
    this.chat.deleteElement(new TextElement(text));
  }

  editText(prev: string, next: string) {
    this.chat.editElement(new TextElement(prev), new TextElement(next));
  }

  showChatHistory() {
    console.log(this.chat.send());
  }
}

let chat = new Chat();

let chatApp = new ChatApplication(chat);
chatApp.sendText("def");
chatApp.sendImage("This is an image");
chatApp.sendText("abc");

chatApp.showChatHistory();
chatApp.deleteText("def");
chatApp.editText("abc", "xyz");
chatApp.showChatHistory();
