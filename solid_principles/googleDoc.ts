// Design a doc editor with the fucntionality of adding text and images only => using bottom up approach

abstract class DocumentElement {
  render(): string {
    return "";
  }
}

class TextElement implements DocumentElement {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  render(): string {
    return this.text;
  }
}

class ImageElement implements DocumentElement {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  render(): string {
    return this.path;
  }
}

class Documentt {
  documentElements: DocumentElement[];

  constructor() {
    this.documentElements = [];
  }

  addElement(element: DocumentElement) {
    this.documentElements.push(element);
  }

  render() {
    let res = "";
    this.documentElements.forEach((element) => {
      res += element.render() + "\n";
    });

    return res;
  }
}

abstract class Persistance {
  save(str: string) {}
}

class FileStorage extends Persistance {
  save(str: string): void {
    console.log("Saving to file: ", str);
  }
}

class DBStorage extends Persistance {
  save(str: string): void {
    console.log("Saving to DB: ", str);
  }
}

class DocumentEditor {
  documentt: Documentt;
  storage: Persistance;
  renderedDocument: string;

  constructor(documentt: Documentt, storage: Persistance) {
    this.documentt = documentt;
    this.storage = storage;
    this.renderedDocument = "";
  }

  addText(text: string) {
    this.documentt.addElement(new TextElement(text));
  }

  addImage(path: string) {
    this.documentt.addElement(new ImageElement(path));
  }

  renderDocument() {
    this.renderedDocument = this.documentt.render();
    console.log(this.renderedDocument);

    return this.renderedDocument;
  }

  save() {
    this.storage.save(this.renderedDocument);
  }
}

const doc = new Documentt();
const storage = new FileStorage();

const documentEditor = new DocumentEditor(doc, storage);

documentEditor.addText("Hello");
documentEditor.addText("World");
documentEditor.addImage("Image");

documentEditor.renderDocument();
documentEditor.save();
