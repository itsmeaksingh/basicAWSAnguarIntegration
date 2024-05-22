import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../_models/User';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userdata: any,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    if (this.userdata) {
      this.userForm.patchValue({
        name: this.userdata.user.name,
        email: this.userdata.user.email,
        role: this.userdata.user.role,
      });
    }
  }

  public onUpdate(): void {
    const payload: User = {
      id: this.userdata.user.id,
      name: this.userForm.value.name,
      role: this.userForm.value.role,
      email: this.userForm.value.email,
    };
    this._userService.updateUser(payload).subscribe({
      next: (value) => {
        const subscription= this._userService.userListSubject$.next([]);
        this._toastr.success(value.msg);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
