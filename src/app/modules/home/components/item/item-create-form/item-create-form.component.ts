import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemQuery} from "../../../../../core/queries/item/item.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {Item} from "../../../../../core/models/item/item.model";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";

@Component({
  selector: 'app-item-create-form',
  templateUrl: './item-create-form.component.html',
  styleUrls: ['./item-create-form.component.scss']
})
export class ItemCreateFormComponent implements OnInit {
  toUpdateImageByteArray: string | undefined ;
  itemForm = new FormGroup({
    name: new FormControl('',Validators.required),
    costPrice: new FormControl(''),
    description: new FormControl(''),
    icon: new FormControl('')
  })
  constructor(private itemQuery: ItemQuery,
              private toasterService: NbToastrService,
              private route: Router) { }

  ngOnInit(): void {
  }
  getItem():Item {
    return new Item('',this.itemForm.value.name,this.itemForm.value.costPrice,this.itemForm.value.description,this.itemForm.value.image,this.toUpdateImageByteArray!)
  }
  get formFields(){
    return this.itemForm?.controls;
  }
  onBack(){
    this.route.navigate(['/item'])
  }
  onFile(event:any){
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bytes = e.target.result.split('base64,')[1];
      // console.log(bytes)
      this.toUpdateImageByteArray = bytes;
    };
    reader.readAsDataURL(file);
  }
  onSubmit(){
    if(this.itemForm?.invalid) return;
    let item = this.getItem();
    if(item!=null){
      this.itemQuery.createItem(item,false).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item created')
          this.itemForm.reset();
          this.route.navigate(['/item/view/'+result.id])
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be created')
        }
      });
    }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
   resizeImage(file: File) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxW = 400;
    var maxH = 400;
    var img = document.createElement('img');
    img.onload = function() {
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min((maxW / iw), (maxH / ih));
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      context?.drawImage(img, 0, 0, iwScaled, ihScaled);
      console.log(canvas.toDataURL());
      document.body.innerHTML+=canvas.toDataURL();
    }
    img.src = URL.createObjectURL(file);
  }
  // document.getElementById("file").addEventListener("change", function() {
  //   file = file.files[0];
  //   if (file) {
  //     resizeImage(file);
  //   }
  // });


}
