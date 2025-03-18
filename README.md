# NavNRead

## Giới thiệu
NavNRead là một WebApp hỗ trợ người mù và khiếm thị đọc tin tức bằng giọng nói. Người dùng có thể điều khiển ứng dụng hoàn toàn bằng giọng nói để nghe tin tức từ nhiều nguồn khác nhau.

## Cách sử dụng
1. Truy cập trang web.
2. Nhấn nút **"Bật giọng nói"** để kích hoạt nhận diện giọng nói.
3. Sử dụng các lệnh thoại:
   - **"Tin tiếp theo"** - Chuyển sang bài tin tức kế tiếp.
   - **"Đọc tiếp"** - Đọc toàn bộ nội dung bài viết.
   - **"Dừng đọc"** - Dừng đọc bài viết hiện tại.

> **Lưu ý:** Hiện tại vẫn cần nhấn nút **Bật giọng nói**, trong tương lai hệ thống sẽ tự động kích hoạt nhận diện giọng nói.

## Cách sử dụng các tính năng
1. Tin tức mới nhất.
   - Nói **"Tin tức mới nhất"** - chuyển sang tính năng này
   - Nói **"Đọc tin này"** - Đọc toàn bộ nội dung bài viết.
   - Nói **"Tin tiếp theo"** - Chuyển sang bài tin tức kế tiếp.
   - Nói **"Tin trước"** - Chuyển sang bài tin tức trước đó.
   - Nói **"Làm mới tin tức"** - Làm mới tin tức mới nhất.
   - Nói **"Dừng đọc"** - Dừng đọc bài viết hiện tại.

## Tính năng mở rộng (Đang phát triển)
- **Hỗ trợ nhiều trang báo**: Lấy tin tức từ các nguồn RSS như Tuổi Trẻ, Vietnamnet, Dân Trí.
- **Lịch sử đọc**: Lưu trữ lịch sử đọc bằng MongoDB để tránh trùng lặp tin tức.
- **Tóm tắt nội dung bằng AI**: Sử dụng OpenAI hoặc Google TTS để tóm tắt nội dung tin tức.
- **Triển khai online**: Đưa ứng dụng lên Vercel và Render.com để chạy trực tuyến.

## Triển khai & Cài đặt
1. Clone repository:
   ```sh
   git clone https://github.com/dominhquangklhd/NavNRead.git
   ```
2. Cài đặt dependencies:
   ```sh
   npm install
   ```
3. Chạy ứng dụng:
   ```sh
   npm start
   ```

## Đóng góp
Mọi ý kiến đóng góp và cải tiến đều được hoan nghênh! Hãy mở một issue hoặc gửi pull request để cùng phát triển NavNRead.

---
**NavNRead - Mang tin tức đến gần hơn với mọi người!** 🚀

