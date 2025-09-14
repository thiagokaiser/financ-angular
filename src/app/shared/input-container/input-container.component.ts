import { Component, OnInit, ContentChild, AfterContentInit, Input } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
    selector: 'app-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.css'],
    standalone: false
})

export class InputContainerComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;

  input: any;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){    
    this.input = this.control;
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva FormControlName')
    }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
