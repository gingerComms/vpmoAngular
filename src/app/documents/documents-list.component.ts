import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { DocumentsService } from './documents.service';
import { PermissionsService } from '../permissions/permissions.service'
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})

export class DocumentsListComponent implements OnInit {
  
  title = 'Documents';

  constructor(
    private authUser: AuthenticationService,
    private _documentsService: DocumentsService,
    private _permissionsService: PermissionsService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  nodeID: string;
  nodeType: string;
  uploadedDocuments: any[] = [];
  currentUserPermissions: any[] = [];
  displayedColumns: string[] = ['document_name', 'document_size', 'uploaded_by', "uploaded_at", "utils"];
  renamingDocument: any;

  ngOnInit() {
    this.nodeID = JSON.parse(localStorage.getItem('node'))._id;
    this.nodeType = localStorage.getItem('nodeType');
    this.getDocuments()
    this.getUserPermissions(this.nodeID, this.nodeType)
  }

  getDocuments () {
    this._documentsService.getUploadedDocuments(this.nodeID, this.nodeType)
      .subscribe(documents => {
        this.uploadedDocuments = documents
      })
  }

  getUserPermissions (nodeID, nodeType) {
    this._permissionsService.getUserPermissions(nodeID, nodeType)
      .subscribe(
        userPermissions => {
          console.log('Permissions', userPermissions)
          this.currentUserPermissions = userPermissions.permissions;
        }
      );
  }

  canUploadDocuments () {
    var uploadPerms = this.currentUserPermissions.filter(item => item.indexOf('update_') >= 0)

    if (uploadPerms.length > 0) {
      return true
    } else {
      return false
    }
  }

  uploadDocuments (e) {
    var files = e.target.files
    var self = this

    console.log(e, files)
    for (var index=0; index < files.length; index++) {
      var file = files[index]
      self._documentsService.getFileUploadUrl(self.nodeID, self.nodeType, file.name).subscribe(response => {
        var documentName = response.file_name
        self._documentsService.uploadFileS3(response.url, file, file.type).subscribe(uploadResponse => {
          self._documentsService.createDocument(self.nodeID, self.nodeType, documentName).subscribe(currentDocuments => {
            self.uploadedDocuments = currentDocuments
          })
        })
      })
    }
  }

  deleteDocument (doc) {
    var self = this
    this._documentsService.deleteDocument(this.nodeID, this.nodeType, doc._id)
      .subscribe(response => {
        self.uploadedDocuments = self.uploadedDocuments.filter(item => item !== doc)
      })
  }

  openRenameDialog (templateRef, document) {
    this.renamingDocument = {
      _id: document._id,
      document_name: document.document_name
    }

    let dialogRef = this.dialog.open(templateRef, {
        width: '250px',
    });

    var self = this
    dialogRef.afterClosed().subscribe(result => {
      self.renamingDocument = null
    });
  }

  renameDocument (document) {
    var self = this
    this._documentsService.renameDocument(this.nodeID, this.nodeType, document._id, document.document_name)
      .subscribe(response => {
        self.uploadedDocuments.forEach(function (i) {
          if (i._id === document._id) {
            i.document_name = document.document_name
            alert('Document Renamed')
          }
        }) 
      })
  }
}
