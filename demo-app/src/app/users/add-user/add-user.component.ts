import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;

  constructor(private _userService: UserService, private _toastr: ToastrService) {}
  ngOnDestroy(): void {}

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    });
  }

  public onSave(): void {
    const payload = {
      name: this.userForm.value.name,
      role: this.userForm.value.role,
      email: this.userForm.value.email,
    };
    this._userService.createUser(payload).subscribe({
      next: (value) => {
        this._userService.userListSubject$.next([]);
        this._toastr.success(value.msg);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
