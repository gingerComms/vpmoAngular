import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule, MatToolbarModule, MatRadioModule, MatSelectModule, MatTableModule, MatListModule, MatCheckboxModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TopicPanelComponent } from './topic-panel.component';
import { TopicPanelService } from './topic-panel.service';
import { ScrumboardModule } from 'app/scrumboard/scrumboard.module';

@NgModule({
    declarations: [
        TopicPanelComponent
    ],
    providers   : [
        TopicPanelService
    ],
    imports     : [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        MatToolbarModule,
        MatRadioModule,
        MatSelectModule,
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,

        FuseSharedModule,

        ScrumboardModule
    ],
    exports     : [
        TopicPanelComponent
    ]
})
export class TopicPanelModule
{
}
