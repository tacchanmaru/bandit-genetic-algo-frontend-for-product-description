import * as React from "react";
import { Button } from "@mui/material";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
};

const Agreement: React.FC<Props> = (props) => {
  return (
    <div
      className="ChatBox"
      style={{
        margin: "auto",
        display: "flex",
        flexFlow: "column",
        maxWidth: "600px",
      }}
    >
      <h1>
        フリマアプリの取引において大規模言語モデルの活用が印象的判断に与える影響の研究
      </h1>
      <p
        style={{
          margin: "8px",
        }}
      >
        <b>▽この実験の目的・概要</b>
        <br />
        この実験は「フリマアプリ上の取引における大規模言語モデルの活用が印象的判断に与える影響の研究」の一環として実施されるものです。
        <br />
        この研究の目的は、大規模言語モデル（LLM）をはじめとしたテクノロジーの活用が、テキストベースのコミュニケーションに与える影響を明らかにすることです。
        <br />
        タスクをしているときに少し疲れたり、飽きたりすることもあるかもしれませんが、基本的に強いストレスを感じるものではないと考えております。もし途中で不快になったときなどには、いつでも実験を中止できます（下記の「この実験への参加と途中辞退の自由」をご覧ください）。
        <br />
        <br />
        <b>▽この実験の所要時間</b>
        <br />
        すべてのタスクを終えるのに個人差はありますが3分程度かかる見込みです。
        <br />
        <br />
        <b>▽この実験に参加いただける方</b>
        <br />
        18歳以上の日本語を母国語とする方で、3分程度、集中してまじめにタスクに取り組んでいただける方。「集中してまじめにタスクに取り組むこと」とは「質問文をよく読んで質問に回答すること」を意味します。
        <br />
        <br />
        <b>▽実験参加者にもたらされる利益および不利益</b>
        <br />
        この研究が皆様に即座に利益をもたらす可能性は、現在のところ低いと考えられます。今後の心理学研究の発展に寄与する重要な基礎的知見をもたらすことが期待されています。
        <br />
        <br />
        <b>▽この実験への参加と途中辞退の自由</b>
        <br />
        この実験への参加はあなたの自由意思にゆだねられています。たとえタスクを開始した後でも、いつでも理由の如何を問わず、参加を取りやめることができます。
        <br />
        <br />
        <b>▽この実験のデータの利用</b>
        <br />
        研究にあたっては研究協力者の皆様に不利益が生じないように個人情報の保護やプライバシーの尊重に努力し最大限の注意を払います。なお、この実験では個人の識別につながる情報を収集することはありません。
        研究の成果は、学会発表や学術雑誌及びデータベース上等で公表されます。
        <br />
        あなたのデータの分析や研究にあたって、研究目的達成に必要な範囲内において、あなたのデータ（タスクで提供いただいた情報など）を、株式会社メルカリ（下記に記載する研究従事者に限ります）と共同利用します。共同利用における管理責任者は東京大学（詳細は以下連絡先記載のとおり）です。
        <br />
        <br />
        <b>▽その他の注意事項</b>
        <br />
        この研究は、「東京大学大学院情報学環・学際情報学府
        ヒトを対象とした実験研究および調査研究に関する倫理審査委員会」において審査され、東京大学大学院情報学環長・学際情報学府長の承認を受けて実施するものです。なお、この研究に関する費用は、共同研究経費（価値交換工学・株式会社メルカリとインクルーシブ工学連携研究機構との共同研究）から支出されています。
        <br />
        <br />
        <b>▽お問い合わせ</b>
        <br />
        疑問点などがありましたら、次のメールアドレスまでご連絡ください。
        <br />
        rintaro-chujo@g.ecc.u-tokyo.ac.jp
        <br />
        中條麟太郎 東京大学大学院学際情報学府 修士課程
        <br />
        <br />
        <b>▽研究従事者</b>
        <br />
        中條麟太郎 東京大学 大学院学際情報学府 修士課程 <br />
        Hautasaari Ari 東京大学 大学院情報学環 特任准教授（研究責任者）
        <br />
        藤原未雪 株式会社メルカリ Researcher
      </p>
      <Button
        variant="contained"
        color="primary"
        className=""
        onClick={() => {
          props.setPageNumber(props.pageNumber + 1);
        }}
        style={{
          margin: "8px",
          // backgroundColor: "#ff333f",
          // color: "white",
        }}
      >
        同意して次に進む
      </Button>
    </div>
  );
};
export default Agreement;
