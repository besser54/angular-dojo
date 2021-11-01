# AngularDojo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Cheatsheet

Umsetzung | Verhalten
-------- | -------- 
`{{Attribut.property}}` in HTML-Content  | Wird durch entsprechenden Wert des Properties des Attributs aus der zugehörigen TypeScript-Klasse ersetzt
`*ngIf="Bedingung"` als HTML-Attribut | HTML-Element wird nur angezeigt wenn die Bedingung zutrifft
`*ngFor="let el of elements"` als HTML-Attribut | HTML-Element wird für jedes Element in `elements` generiert und innerhalb der einzelnen Elemente steht die Variable `el` zur Verfügung
`[(ngModel)]="Attribut.property"` als HTML-Attribut | Two-Way Binding zwischen HTML-Content und Property des Attributs in der zuegehörigen TypeScript-Klasse
`(click)="funktion()"`  als HTML-Attribut | Event-Listener: Hier zB wird bei einem Klick auf das Element die entsprechende Methode aufgerufen   
`[class.cssClass]="Bedingung"` als HTML-Attribut  | Element erhält die Css-Klasse `cssClass` wenn die Bedingung erfüllt ist   
`[InputAtt]="Attribut"` bzw. `(OutputEvent)="funktion()"` als HTML-Attribut einer Child-Component | Gibt Input bzw. reagiert auf Output der Child-Component

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
