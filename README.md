# Dana School Management System

A comprehensive school management system built with Next.js, featuring AI-powered homework generation, student management, and Telegram integration.

## 🚀 Features

### 📚 Homework Management
- **AI-Powered Report Generation**: Generate professional homework reports using Grok-4-Fast AI model
- **Telegram Integration**: Automatically send reports to Telegram channels
- **Multi-Subject Support**: Handle multiple subjects in a single report
- **Persian Language Support**: Full RTL support and Persian text processing

### 👥 Student Management
- **Student Profiles**: Complete student information management
- **Class Organization**: Organize students by classes (701, 702, etc.)
- **CRUD Operations**: Create, read, update, and delete student records
- **Search & Filter**: Find students quickly with advanced filtering

### 📖 Subject Management
- **Subject Tracking**: Manage different subjects and their details
- **Integration**: Connect subjects with homework reports

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenRouter API with Grok-4-Fast model
- **Backend**: Cloudflare Workers
- **Database**: JSON-based storage
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dana-school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# OpenRouter API Key (for AI homework generation)
OPENROUTER_API_KEY=your_openrouter_api_key

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### Cloudflare Worker Setup
The homework generation is powered by a Cloudflare Worker. To set it up:

1. Navigate to the `cloudflare-worker` directory
2. Install dependencies: `npm install`
3. Deploy: `npm run deploy`

## 📱 Usage

### Generating Homework Reports
1. Navigate to the **Homework** page
2. Fill in the class information:
   - Date
   - Class name
   - Teacher name
3. Add subjects with their content and homework
4. Configure Telegram settings
5. Click "Generate and Send Report"

### Managing Students
1. Go to the **Students** page
2. Add new students with their information
3. Edit existing student profiles
4. Organize students by classes

## 🎨 UI Features

- **Dark Theme**: Modern dark UI with excellent contrast
- **Responsive Design**: Works perfectly on desktop and mobile
- **Persian RTL Support**: Proper right-to-left text rendering
- **3D Icons**: Beautiful 3D-style icons throughout the interface
- **Smooth Animations**: Smooth transitions and hover effects

## 🔗 API Endpoints

### Student Management
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get specific student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student
- `GET /api/students/class/[className]` - Get students by class

### Subject Management
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create new subject

### Homework Generation
- `POST /api/generate-homework` - Generate homework report (Cloudflare Worker)

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Cloudflare Worker Deployment
1. Install Wrangler CLI: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler login`
3. Deploy: `wrangler deploy`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for Dana School**
