import Image from 'next/image';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <Image src="/images/mail.svg" alt="mail" width={20} height={16} />
      <div className="footer-mail">tutejsy.bot@gmail.com</div>
    </footer>
  );
}
