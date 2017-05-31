import './style.less';
import { Component } from 'react';
import { render } from 'react-dom';

class Carousel extends Component {
  state = { ptr: 0 };
  timeout = null;//轮播定时器
  static url = 'http://laichuanfeng.com/demo/carousel/';
  static imgs = [
    'carousel_1.jpg',
    'carousel_2.jpg',
    'carousel_3.jpg',
    'carousel_4.jpg',
    'carousel_5.jpg'
  ];

  /**
   * 循环输出索引
   * @param startIndex {Number} 开始的索引
   * @param interval {Number} 间隔
   * @param length {Number} 循环长度
   */
  static makeIndex = ({ startIndex, interval, length }) => {
    let index = startIndex;
    return () => {
      index += interval;
      return index % length;
    };
  };

  /**
   * 定时器，切换指针指向
   * @param startIndex {Number} 轮播开始时的元素索引
   */
  cyclePlay = startIndex => {
    const index = Carousel.makeIndex({
      startIndex,
      interval: 1,
      length: Carousel.imgs.length
    });
    const interval = 3000;
    this.setState({ ptr: startIndex });

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(function timer() {
      this.setState({ ptr: index() });
      this.timeout = setTimeout(timer.bind(this), interval);
    }.bind(this), interval);

  };

  /**
   * 计算当前元素的样式
   * @param index {Number} 元素的索引
   */
  getClassName = index => {
    const { ptr } = this.state;
    const length = Carousel.imgs.length;
    return index === ptr
      ? 'center'
      : index === (ptr + length - 1) % length
        ? 'left'
        : 'right';
  };

  componentDidMount() {
    this.cyclePlay(0);
  }

  render() {
    return (
      <div className="content">
        <ul className="carousel">
          {
            Carousel.imgs.map((img, index) =>
              <li
                key={index}
                className={this.getClassName(index)}
                style={{ background: `url(${Carousel.url}${img})` }}
              ></li>
            )
          }
        </ul>
      </div>
    );
  };
}

render(<Carousel />, document.getElementById('root'));