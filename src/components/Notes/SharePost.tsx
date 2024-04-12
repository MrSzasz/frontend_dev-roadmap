import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface SharePostProps {
  pageUrl: string;
}

const SharePost = ({ pageUrl }: SharePostProps): React.ReactElement => {
  return (
    <div className="flex md:flex-col flex-wrap gap-4 md:w-fit w-full">
      <TwitterShareButton
        url={pageUrl}
        className="cursor-none"
        data-interactive
      >
        <XIcon size={32} className="cursor-none" round />
      </TwitterShareButton>
      <FacebookShareButton
        url={pageUrl}
        className="cursor-none"
        data-interactive
      >
        <FacebookIcon size={32} className="cursor-none" round />
      </FacebookShareButton>
      <TelegramShareButton
        url={pageUrl}
        className="cursor-none"
        data-interactive
      >
        <TelegramIcon size={32} className="cursor-none" round />
      </TelegramShareButton>
      <WhatsappShareButton
        url={pageUrl}
        className="cursor-none"
        data-interactive
      >
        <WhatsappIcon size={32} className="cursor-none" round />
      </WhatsappShareButton>
      <EmailShareButton url={pageUrl} className="cursor-none" data-interactive>
        <EmailIcon size={32} className="cursor-none" round />
      </EmailShareButton>
      <LinkedinShareButton
        url={pageUrl}
        className="cursor-none"
        data-interactive
      >
        <FacebookIcon size={32} className="cursor-none" round />
      </LinkedinShareButton>
      <RedditShareButton url={pageUrl} className="cursor-none" data-interactive>
        <RedditIcon size={32} className="cursor-none" round />
      </RedditShareButton>
    </div>
  );
};

export default SharePost;
