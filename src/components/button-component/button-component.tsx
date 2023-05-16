import { Component, Method, Element, Event, EventEmitter, Prop, h, Host } from '@stencil/core';
import { ColorScheme, colorSchemes, toClass } from '../../utils/color-scheme.enum';

export type MouseHandler = (evt: MouseEvent) => void;

// export class ButtonController {

//   constructor(private button: ButtonComponent) {

//   }

//   private clickHandlers: MouseHandler[];
//   private hoverHandlers: MouseHandler[];
//   private mouseLeaveHandlers: MouseHandler[];

//   registerClickHandler(h: MouseHandler) {

//   }
// }

@Component({
  tag: 'idun-button',
  styleUrl: 'button-component.css',
  shadow: true,
})
export class IdunButtonComponent {
  @Prop() label: string = '';
  @Prop() colorScheme: ColorScheme = 'BlueGray';
  @Prop() shadowOnHover: boolean = true;

  @Element() el: HTMLElement;
  @Event({ eventName: 'initialized' }) initialized: EventEmitter<object>;

  private _clickHandlers: { [key: string]: MouseHandler } = {};
  private _mouseEnterHandlers: { [key: string]: MouseHandler } = {};
  private _mouseLeaveHandlers: { [key: string]: MouseHandler } = {};

  // @Event({ eventName: 'initialized'}) initializedEvent: EventEmitter<ButtonController>;

  connectedCallback() {
    if (!colorSchemes.includes(this.colorScheme)) throw new Error('Invalid colorScheme: "' + this.colorScheme + '"');
    this.initialized.emit(this);
  }

  @Method()
  async registerClickHandler(funcId: string, func: MouseHandler) {
    console.log(funcId);
    if (this._clickHandlers[funcId]) {
      this.el.removeEventListener('click', this._clickHandlers[funcId]);
    }

    const handler: MouseHandler = (evt: MouseEvent) => {
      func(evt);
    };
    this._clickHandlers[funcId] = handler;
    this.el.addEventListener('click', handler);
  }

  @Method()
  async unregisterClickHandler(funcId: string) {
    if (this._clickHandlers[funcId]) {
      this.el.removeEventListener('click', this._clickHandlers[funcId]);
      delete this._clickHandlers[funcId];
    }
  }

  getClasses() {
    let classes = toClass(this.colorScheme);
    classes += this.shadowOnHover ? ' shadowed' : '';
    return classes;
  }

  disconnectedCallback() {
    for (const value of Object.values(this._clickHandlers)) {
      this.el.removeEventListener('click', value);
    }
    this._clickHandlers = {};
  }

  render() {
    return <Host class={this.getClasses()}>{this.label}</Host>;
  }
}
