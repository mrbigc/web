# โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู

เว็บไซต์โรงเรียนที่สร้างด้วย Next.js, Prisma และ Neon Database

## ฟีเจอร์หลัก
- 🏠 หน้าหลักแสดงกิจกรรม
- 👥 หน้าสมาชิกสภานักเรียน
- ⚙️ ระบบจัดการผู้ดูแล
- 🎨 ธีมสีแดงน้ำเงิน
- 📱 Responsive Design

## การติดตั้ง

1. Clone repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/thai-school-website.git
cd thai-school-website
\`\`\`

2. ติดตั้ง dependencies
\`\`\`bash
npm install
\`\`\`

3. ตั้งค่า Environment Variables
\`\`\`bash
cp .env.example .env.local
# แก้ไข DATABASE_URL ใน .env.local
\`\`\`

4. Setup Database
\`\`\`bash
npx prisma db push
\`\`\`

5. รันโปรเจกต์
\`\`\`bash
npm run dev
\`\`\`

## การ Deploy

### Vercel
1. Push โค้ดไป GitHub
2. เชื่อมต่อ Vercel กับ GitHub
3. เพิ่ม Environment Variables
4. Deploy!

### Environment Variables
- `DATABASE_URL`: Neon PostgreSQL connection string

## การใช้งาน

- **หน้าหลัก**: `/`
- **สมาชิกสภา**: `/council`
- **ล็อคอิน**: `/login` (admin/admin123)
- **ผู้ดูแล**: `/admin`

## เทคโนโลยี

- **Frontend**: Next.js 14, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **UI**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

MIT License
