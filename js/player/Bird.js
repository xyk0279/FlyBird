import {Sprite} from "../base/Sprite.js";
const { screenWidth, screenHeight } = wx.getSystemInfoSync()
export class Bird extends Sprite{ //小鸟类 循环渲染图片的三个部分
	constructor(){
		const image = Sprite.getImage('birds');
		super(
			image,
			0,
			0,
			image.width,
			image.height,
			0,
			0,
			image.width,
			image.height,
		);
		//小鸟的三种状态需要数组存储
		//宽34 高24 上下边距10 左右边距9
		this.clippingX = [
			9,
			9+34+18,
			9+34+18+34+18
		];
		this.clippingY = [
			10,10,10
		];
		this.clippingWidth = [
			34,34,34
		];
		this.clippingHeight = [
			24,24,24
		];
    const birdX = screenWidth / 4;
		this.birdsX = [birdX,birdX,birdX];
    const birdY = screenHeight / 2;
		this.birdsY = [birdY,birdY,birdY];
		const birdWidth = 34;
		this.birdsWidth = [birdWidth,birdWidth,birdWidth];
		const birdHeight = 24;
		this.birdsHeight = [birdHeight,birdHeight,birdHeight];
		this.y = [birdY,birdY,birdY];
		this.index = 0;
		this.count = 0;
		this.time = 0;
	}
	draw(){
		const speed = .2;    //切换小鸟的速度
		this.count = this.count + speed;
		if(this.index >= 2){
			this.count = 0;
		}
		this.index = Math.floor(this.count);
		//模拟重力加速度
		const g = .98/2.4;
		const offsetUp = 30;
		const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
		for(let i = 0;i<=2;i++){
			this.birdsY[i] = this.y[i] + offsetY;
		}
		this.time ++;

		super.draw(
			this.img,
			this.clippingX[this.index],
			this.clippingY[this.index],
			this.clippingWidth[this.index],
			this.clippingHeight[this.index],
			this.birdsX[this.index],
			this.birdsY[this.index],
			this.birdsWidth[this.index],
			this.birdsHeight[this.index],
		);
	}
}

