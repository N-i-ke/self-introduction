// src/types/emailjs.d.ts

declare module "emailjs-com" {
  export function sendForm(
    service_id: string,
    template_id: string,
    form: HTMLFormElement,
    user_id: string
  ): Promise<any>;

  export function send(
    service_id: string,
    template_id: string,
    template_params: { [key: string]: any },
    user_id: string
  ): Promise<any>;
}
