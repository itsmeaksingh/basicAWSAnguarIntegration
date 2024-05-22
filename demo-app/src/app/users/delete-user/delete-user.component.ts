import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../../Services/user.service';
import { User } from '../../_models/User';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  public deleteUser(): void {
    this._userService.deleteUser(this.data.id).subscribe({
      next: (value) => {
        const subscription = this._userService.userListSubject$.subscribe(
          (data: User[]) => {
            this._toastr.success(value.msg);
            data = data.filter((d: User) => d.id !== this.data.id);
            this._userService.userListSubject$.next(data);
          }
        );
        subscription.unsubscribe();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
