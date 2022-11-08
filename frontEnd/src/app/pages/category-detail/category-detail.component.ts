import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  categoryId = "";
  category!: any;
  shopItems!: any;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    try {
      this.category = await this.postService.searchCategory(this.categoryId)
    } catch (error) {
      this.router.navigate(['categories']);
    }
    this.shopItems = await this.postService.getProductsByCategory(this.category.data._id)
    this.shopItems.map((item: any) => {
      item.category = this.category.data.name
      item.imageUrl = environment.apiUrl + "/" + item.profile
      item.amount = 0
      item.id = item._id
      return item
    })
  }

}
