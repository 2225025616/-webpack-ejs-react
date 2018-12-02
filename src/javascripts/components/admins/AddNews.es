import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import RowInput from "../commons/RowInput";
import Image from "../commons/Image";
import FormUtil from "../../utils/FormUtil";
import FormValidator from "../../utils/FormValidator";
import TinyMCE from 'react-tinymce';
import { addNews, getNewsDetail } from "../../actions/adminAction";
import AdminRoute from '../admins/AdminRoute';
import push from "../../utils/push";
import IdUtil from "../../utils/IdUtil";
import Link from "../commons/LangLink";

const fields = ["title", "description", "source", "type"];

let file = "";
let text = "";

let id = "";

const validate = values => {
  return new FormValidator(values)
    .nonEmpty("title", "新闻标题")
    .nonEmpty("description", "新闻概述")
    .nonEmpty("source", "来源")
    .errors;
};

const getInitialValues = state => {
  if (!IdUtil.newsId(state.router)) {
  }
  else
    return {
      ...state.admin.newsInfo,
    };
};

@reduxForm({form: "add-new", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    newsInfo: state.admin.newsInfo,
    params: state.router.params,

    onSubmit: (values, dispatch) => {
      let adminRoute = AdminRoute.adminRoute();
      let data = {...values, file, text, id: (id ? id : "")};
      dispatch(addNews(data, () => {
        dispatch(push(`/${adminRoute}/web-management`));
      }));
    }
  }
})

export default class AddNews extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    showViewModal: false,
  };

  componentWillMount() {
    id = IdUtil.newsId(this.props);
    if (id) {
      this.props.dispatch(getNewsDetail(id));
    }
  }

  openViewModal = () => {
    this.setState({showViewModal: true});
  };

  closeViewModal = () => {
    this.setState({showViewModal: false});
  };

  changeImage = (e) => {
    file = e.target.files;
    if (file.length > 0) {
      this.forceUpdate();
    }
  };

  handleEditorChange = (e) => {
    text = e.target.getContent();
  };

  render() {
    const {fields: {title, description, source, type}, newsInfo, handleSubmit} = this.props;
    let adminRoute = AdminRoute.adminRoute();

    return <section id="company-kyc">
      <div className="title">
        <Link className="link" to={`/${adminRoute}/web-management`}>
          网站管理
        </Link> > 添加新闻</div>
      {
        !id || (id && id === newsInfo.id) ?
          <form className="add-news" onSubmit={handleSubmit}>
            <section>
              <span>新闻标题</span>
              <RowInput type="text" {...FormUtil.extract(title)} file={title} width="200" height="30"/>
            </section>
            <section>
              <span>新闻概述</span>
              <RowInput type="text" {...FormUtil.extract(description)} file={description} width="600" height="30"/>
            </section>
            <section>
              <span>来源</span>
              <RowInput type="text" {...FormUtil.extract(source)} file={source} width="200" height="30"/>
            </section>
            <section>
              <span>分类</span>
              <select {...FormUtil.extract(type, "select")}>
                <option value="Report">保全咨询</option>
                <option value="Media">媒体报道</option>
              </select>
            </section>
            <section className="pic">
              <span>图片</span>
              {
                !id ?
                  <Image altSrc={require("images/default-product-logo.png")} src={(file && file[0])}/>
                  :
                  <Image altSrc={require("images/default-product-logo.png")}
                         src={(file && file[0]) || newsInfo.fileKey}/>
              }
              <div className="upload-file">
                <span>上传图片</span>
                <input type="file" onChange={this.changeImage} accept="image/jpg, image/png, image/jpeg"/>
              </div>
            </section>
            <section className="pic">
              <span>内容</span>
              <TinyMCE content={id ? newsInfo.text : ''}
                       config={{
                         selector: 'textarea',
                         width: 1000,
                         height: 500,
                         elementpath: false,
                         plugins: ['link', 'paste', 'table', 'image', 'imagetools', 'preview'],
                         toolbar: 'undo redo | bold italic | table | link image | alignleft aligncenter alignright alignjustify | preview',
                         language: 'zh_CN',
                         language_url: '/js/zh_CN.js',
                         paste_data_images: true,
                         automatic_uploads: false,
                         file_picker_types: 'image',
                       }}
                       onChange={this.handleEditorChange}/>
            </section>
            <section>
              <span/>
              <div className="btn-group">
                <button type="button" className="view" onClick={this.openViewModal}>预览</button>
                <button type="submit">{id ? "编辑" : "提交"}</button>
              </div>
            </section>
          </form>
          : ""
      }

      {this.state.showViewModal ?
        <ModalContainer onClose={this.closeViewModal}>
          <ModalDialog onClose={this.closeViewModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">预览</h1>
            <article className="admin-news-html">
              <div dangerouslySetInnerHTML={{__html: text}}/>
            </article>
          </ModalDialog>
        </ModalContainer>
        : null}
    </section>
  }
}