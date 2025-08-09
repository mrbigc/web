-- Create initial activities
INSERT INTO Activity (id, title, description, image, category, author, views, createdAt, updatedAt) VALUES
('activity1', 'งานวันกีฬาสี ประจำปี 2567', 'กิจกรรมงานวันกีฬาสีประจำปีของโรงเรียน เพื่อส่งเสริมความสามัคคีและการออกกำลังกายของนักเรียน', '/placeholder.svg?height=300&width=400', 'กิจกรรมกีฬา', 'ครูสมชาย', 245, datetime('now'), datetime('now')),
('activity2', 'โครงการปลูกป่าเฉลิมพระเกียรติ', 'นักเรียนร่วมกิจกรรมปลูกป่าเพื่อเฉลิมพระเกียรติและอนุรักษ์สิ่งแวดล้อม', '/placeholder.svg?height=300&width=400', 'สิ่งแวดล้อม', 'ครูสมหญิง', 189, datetime('now'), datetime('now')),
('activity3', 'การแข่งขันทักษะวิชาการ', 'นักเรียนเข้าร่วมการแข่งขันทักษะวิชาการระดับจังหวัด และได้รับรางวัลเหรียญทอง', '/placeholder.svg?height=300&width=400', 'วิชาการ', 'ครูสมศรี', 312, datetime('now'), datetime('now'));

-- Create initial council members
INSERT INTO CouncilMember (id, name, position, grade, image, bio, achievements, email, phone, createdAt, updatedAt) VALUES
('member1', 'นางสาวสมใจ ใจดี', 'ประธานสภานักเรียน', 'มัธยมศึกษาปีที่ 6', '/placeholder.svg?height=300&width=300', 'เป็นนักเรียนที่มีความรับผิดชอบสูง มีความสามารถในการเป็นผู้นำ และมีผลการเรียนดีเยี่ยม', '["รางวัลนักเรียนดีเด่นระดับจังหวัด", "รางวัลผู้นำเยาวชนดีเด่น", "เกรดเฉลี่ย 3.95"]', 'somjai@school.ac.th', '081-234-5678', datetime('now'), datetime('now')),
('member2', 'นายสมศักดิ์ มานะดี', 'รองประธานสภานักเรียน', 'มัธยมศึกษาปีที่ 5', '/placeholder.svg?height=300&width=300', 'นักเรียนที่มีความคิดสร้างสรรค์ ชอบการทำงานเป็นทีม และมีความสามารถในการแก้ไขปัญหา', '["รางวัลโครงงานวิทยาศาสตร์ระดับภาค", "รางวัลนักเรียนอาสาดีเด่น", "เกรดเฉลี่ย 3.87"]', 'somsak@school.ac.th', '081-345-6789', datetime('now'), datetime('now')),
('member3', 'นางสาวสมหญิง รักเรียน', 'เลขานุการสภานักเรียน', 'มัธยมศึกษาปีที่ 5', '/placeholder.svg?height=300&width=300', 'มีความละเอียดรอบคอบ ชอบการจดบันทึก และมีความสามารถในการจัดการเอกสาร', '["รางวัลนักเรียนมีระเบียบวินัยดีเด่น", "รางวัลการแข่งขันเรียงความ", "เกรดเฉลี่ย 3.92"]', 'somying@school.ac.th', '081-456-7890', datetime('now'), datetime('now')),
('member4', 'นายสมชาย ขยันเรียน', 'เหรัญญิกสภานักเรียน', 'มัธยมศึกษาปีที่ 4', '/placeholder.svg?height=300&width=300', 'มีความสามารถในการคำนวณ มีความซื่อสัตย์ และรับผิดชอบในการจัดการเงิน', '["รางวัลการแข่งขันคณิตศาสตร์", "รางวัลนักเรียนซื่อสัตย์ดีเด่น", "เกรดเฉลี่ย 3.85"]', 'somchai@school.ac.th', '081-567-8901', datetime('now'), datetime('now'));

-- Create initial settings
INSERT INTO Setting (id, key, value) VALUES
('setting1', 'schoolLogo', ''),
('setting2', 'facebookLink', ''),
('setting3', 'instagramLink', '');
