import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {
  @Input() type!: String;
  @Input() action!: String;
  @Input() data?: any;
  @Input() genres?: any[];
  @Output() manageItemEvent = new EventEmitter<any>();

  form!: FormGroup;
  loading:Boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    switch (this.type) {
      case 'genre':
        this.form = this.fb.group({
          title: [this.data?.title || '', Validators.required],
          desc: [this.data?.desc || '']
        })
        break;
      case 'author':
        this.form = this.fb.group({
          first_name: [this.data?.first_name || '', Validators.required],
          last_name: [this.data?.last_name || '', Validators.required],
          homeland: [this.data?.homeland || ''],
          genre: [this.data?.genre || '']
        })
        break;
      case 'book':
        this.form = this.fb.group({
          title: [this.data?.title || '', Validators.required],
          desc: [this.data?.desc || '']
        })
        break;
      default:
        break;
    }
  }

  manageForm(modal: any){
    this.loading = true;
    let data = this.action !== 'delete' ? this.form.value : this.data;
    if (this.data && this.action !== 'delete') {
      data.id = this.data.id
    }

    if (!this.data && this.action === 'add') {
      data.id = UUID.UUID();
    }

    this.manageItemEvent.emit(data);
    setTimeout(() => {
      this.loading = false;
      this.form.reset();
      modal.close();
    }, 1000)
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
}
