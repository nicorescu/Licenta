import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'hk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output()
  submitSearchEmitter = new EventEmitter();

  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
    });
  }

  submitSearch() {
    this.submitSearchEmitter.emit(this.keyword);
  }

  public get keyword() {
    return this.searchForm.get('keyword').value;
  }
}
