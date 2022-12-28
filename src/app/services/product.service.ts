import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service for navigating to the product creation gateway while passing the created image to
 * put on the product.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_KEY = "0ljHXDUqqP4NfbNbWV0nT1gl4RNAkNsG3Knu8Fcn";

  createOptions = (base64_image: string, prompt: string) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.API_KEY}`,
    },
    body: JSON.stringify({
      image_url: base64_image,
      item_code: "AI1",
      name: "AI Generated T-Shirt",
      colours: "White",
      description: "An epic AI generated T-Shirt created with the prompt: \n" + prompt,
      price: 20.00,
    }),
  });

  constructor(private http: HttpClient) { }
}
