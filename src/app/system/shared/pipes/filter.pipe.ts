import {Pipe, PipeTransform} from '@angular/core';
import {AppEvent} from "../models/event.model";
import {Category} from "../models/category.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: AppEvent[], value: string, field: string, categories: Category[]): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i: any) => {
      const t = Object.assign({}, i);
      if (field === 'category') {
        const index = categories.findIndex((c: Category) => c.id === t.category);
        t[field] = categories[index]?.name
      }

      return t[field].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
    })
  }
}
