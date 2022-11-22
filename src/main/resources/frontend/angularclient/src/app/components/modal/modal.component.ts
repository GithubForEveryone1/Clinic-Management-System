import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { NgbActiveModal, ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
	providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent implements OnInit {
	@Input() response: any;
	@ViewChild("content", { static: true }) content: ElementRef | undefined;

	closeResult = '';

	constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit() {
		this.open(this.content);
	}

	open(content: any) {
		this.modalService.open(content);
	}

	/*	 open(content: any) {
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				},
			);
		}  */

	/*	private getDismissReason(reason: any): string {
			if (reason === ModalDismissReasons.ESC) {
				return 'by pressing ESC';
			} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
				return 'by clicking on a backdrop';
			} else {
				return `with: ${reason}`;
			}
		} */

}
