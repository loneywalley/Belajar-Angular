import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataList: any[] = [];

  getAllData() {
    return this.dataList;
  }

  getDataById(id: string) {
    return this.dataList.find((item) => item.id === id);
  }

  addData(data: any) {
    data.id = Math.random().toString(36).substring(2);
    this.dataList.push(data);
  }

  updateData(id: string, newData: any) {
    const index = this.dataList.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.dataList[index] = { ...newData, id };
    }
  }

  deleteData(id: string) {
    this.dataList = this.dataList.filter((item) => item.id !== id);
  }
}
