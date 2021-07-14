import type { App } from 'vue';

import {
  // Need
  message,
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Select,
  Steps,
  Switch,
  Spin,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Result,
  Space,
  Upload,
} from 'ant-design-vue';

import { DownOutlined } from '@ant-design/icons-vue';

message.config({ maxCount: 1, top: '80px' }); // 最大显示数, 超过限制时，最早的消息会被自动关闭

export function registerGlobComp(app: App) {
  const Ant = {
    install(app: App) {
      app.component(Alert.name, Alert);
      app.component(Button.name, Button);
      app.component(Card.name, Card);
      app.component(Checkbox.name, Checkbox);
      app.component(Checkbox.Group.name, Checkbox.Group);
      app.component(Col.name, Col);
      // DatePicker
      app.component(DatePicker.name, DatePicker);
      app.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
      app.component(Divider.name, Divider);
      app.component(Dropdown.name, Dropdown);
      app.component(Form.name, Form);
      app.component(Form.Item.name, Form.Item);
      app.component(Input.name, Input);
      app.component('a-textarea', Input.TextArea);
      app.component(Input.Search.name, Input.Search);
      app.component(Layout.name, Layout);
      app.component(Layout.Header.name, Layout.Header);
      app.component(Layout.Sider.name, Layout.Sider);
      app.component(Layout.Content.name, Layout.Content);
      app.component(Menu.name, Menu);
      app.component(Menu.Item.name, Menu.Item);
      app.component(Menu.SubMenu.name, Menu.SubMenu);
      app.component(Modal.name, Modal);
      app.component(Popconfirm.name, Popconfirm);
      // Popover
      app.component(Popover.name, Popover);

      app.component(Result.name, Result);
      app.component(Row.name, Row);
      app.component(Select.name, Select);
      app.component('a-select-option', Select.Option);
      app.component('a-select-opt-group', Select.OptGroup);
      // Steps
      app.component(Steps.name, Steps);
      app.component(Steps.Step.name, Steps.Step);
      app.component(Switch.name, Switch);
      app.component(Space.name, Space);
      app.component(Spin.name, Spin);
      app.component(Table.name, Table);
      app.component(Tabs.name, Tabs);
      app.component(Tabs.TabPane.name, Tabs.TabPane);
      app.component(Tag.name, Tag);
      app.component(TimePicker.name, TimePicker);
      app.component('DownOutlined', DownOutlined);
      app.component(Upload.name, Upload);
    },
  };
  app.use(Ant);
}
