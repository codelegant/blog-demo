/**
 * Author: codelegant
 * Email: laichuanfeng@hotmail.com
 * Date: 2017/1/3
 */
import { Component, PropTypes } from 'React';
const { bool, func, string, node, object }=PropTypes;
export default class Checkbox extends Component {
  static version = '1.0.0';

  static propTypes = {
    checked: bool,
    onChange: func,
    children: node,
    label: string,
    style: object,
  };

  static defaultProps = {
    onChange: () => {},
  };

  render() {
    const { checked, onChange, children, label, style, ...rest }=this.props;
    return (
      <label
        className="checkbox"
        style={style}
      >
        <input
          {...rest}
          type="checkbox"
          className="checkbox-ele"
          checked={checked}
          onChange={onChange}
        />
        <div className="checkbox-label"/>
        {label || children}
      </label>
    );
  }
}