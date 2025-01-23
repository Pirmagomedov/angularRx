import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'a-a',
    imports: [CommonModule],
    templateUrl: './a.html'
})
export class Aa {
    
    @Input() ali!: () => void

    but() {
        this.ali()
    }
}
