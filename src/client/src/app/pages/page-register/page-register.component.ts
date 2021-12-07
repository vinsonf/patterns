import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketioService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private socketService: SocketioService
  ) {
    this.form =  this.fb.group({
      username: [''],
      password: [''],
    });

  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  register() {
    console.log(this.form.value);
    console.log(this.socketService.socketId)
    this.socketService.emit('register', {...this.form.value, socketId: this.socketService.socketId});
  }

  login() {
    console.log(this.form.value);
    this.socketService.emit('login', this.form.value);
  }

}
