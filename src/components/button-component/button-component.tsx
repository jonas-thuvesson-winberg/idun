import { Component, Method, Element, Event, EventEmitter, Prop, h, Host } from '@stencil/core';
import { ColorScheme, colorSchemes, toClass } from '../../utils/color-scheme.enum';

export type MouseHandler = (evt: MouseEvent) => void;
export type KeyboardHandler = (evt: KeyboardEvent) => void;
export type Handler = (evt: Event) => void;

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
})
export class IdunButtonComponent {
  @Prop() label: string = '';
  @Prop() colorScheme: ColorScheme = 'BlueGray';
  @Prop() shadowOnHover: boolean = true;

  @Element() el: HTMLElement;
  @Event({ eventName: 'initialized' }) initialized: EventEmitter<object>;

  private _clickHandler: MouseHandler = () => {};
  private _enterHandler: KeyboardHandler = () => {};
  private _hoverHandler: MouseHandler = () => {};
  private _blurHandler: MouseHandler = () => {};

  // private click = (event: MouseEvent) => {
  //   this._clickHandler(event);
  // };

  private _onEnter = e => {
    if (e.key === 'enter') {
      this._enterHandler(e);
    }
  };

  private _onClick = e => {
    this._clickHandler(e);
  };

  private _onHover = e => {
    this._hoverHandler(e);
  };

  private _onBlur = e => {
    this._blurHandler(e);
  };

  // @Event({ eventName: 'initialized'}) initializedEvent: EventEmitter<ButtonController>;

  connectedCallback() {
    if (!colorSchemes.includes(this.colorScheme)) throw new Error('Invalid colorScheme: "' + this.colorScheme + '"');
  }

  componentDidRender() {
    this.el.addEventListener('keypress', this._onEnter);
    this.el.addEventListener('click', this._onClick);
    this.el.addEventListener('mouseenter', this._onHover);
    this.el.addEventListener('mouseleave', this._onBlur);

    this.initialized.emit(this);
  }

  @Method()
  async onClick(func: Handler) {
    this._enterHandler = func as KeyboardHandler;
    this._clickHandler = func as MouseHandler;
  }

  @Method()
  async onHover(func: MouseHandler) {
    this._hoverHandler = func;
  }

  @Method()
  async onBlur(func: MouseHandler) {
    this._hoverHandler = func;
  }

  getClasses() {
    let classes = toClass(this.colorScheme);
    classes += this.shadowOnHover ? ' shadowed' : '';
    return classes;
  }

  disconnectedCallback() {
    this.el.removeEventListener('keypress', this._onEnter);
    this.el.removeEventListener('click', this._onClick);
    this.el.removeEventListener('mouseenter', this._onHover);
    this.el.removeEventListener('mouseleave', this._onBlur);
  }

  render() {
    return (
      <Host role="button" aria-pressed="false" class={this.getClasses()}>
        <span class="label">{this.label}</span>
      </Host>
    );
  }
}
