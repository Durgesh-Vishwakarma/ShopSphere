# 🤝 Contributing to ShopSphere

Thank you for your interest in contributing to ShopSphere! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB account (MongoDB Atlas recommended)
- Cloudinary account for image uploads
- Git for version control

### Local Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ShopSphere.git
   cd ShopSphere
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Durgesh-Vishwakarma/ShopSphere.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```
5. **Set up environment variables** (copy `.env.example` to `.env`)
6. **Start development servers**:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: New features (`feature/user-authentication`)
- **bugfix/**: Bug fixes (`bugfix/cart-quantity-error`)
- **hotfix/**: Critical production fixes

### Creating a Feature Branch
```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Work on your feature...
# Commit your changes
git add .
git commit -m "feat: add user authentication system"

# Push to your fork
git push origin feature/your-feature-name
```

## 📝 Code Standards

### JavaScript/React
- Use **functional components** with hooks
- Follow **React best practices** and patterns
- Use **ES6+ features** (arrow functions, destructuring, etc.)
- Implement **proper error boundaries**
- Write **accessible components** (ARIA labels, semantic HTML)

### CSS/Styling
- Use **Tailwind CSS** utility classes
- Follow **mobile-first** responsive design
- Maintain **consistent spacing** using 8px grid system
- Use **semantic color names** from the design system

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Card, etc.)
│   └── layout/         # Layout components (Header, Footer)
├── screens/            # Page-level components
├── hooks/              # Custom React hooks
├── slices/             # Redux slices and API endpoints
├── utils/              # Helper functions
└── assets/             # Static assets
```

### Naming Conventions
- **Components**: PascalCase (`ProductCard.jsx`)
- **Files**: camelCase (`userController.js`)
- **Variables**: camelCase (`isLoading`, `userInfo`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case following Tailwind conventions

## 📬 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or correcting tests
- **chore**: Maintenance tasks

### Examples
```bash
feat(auth): add JWT token refresh mechanism
fix(cart): resolve quantity update issue in shopping cart
docs(readme): update installation instructions
style(header): improve responsive design for mobile devices
```

## 🔍 Pull Request Process

### Before Submitting
1. **Ensure tests pass**: Run `npm test`
2. **Lint your code**: Run `npm run lint`
3. **Test manually**: Verify your changes work as expected
4. **Update documentation** if needed

### PR Title Format
```
[Type] Brief description of changes
```

### PR Description Template
```markdown
## 🎯 What does this PR do?
Brief description of the changes

## 🔧 Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## 📋 Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published
```

## 🐛 Issue Reporting

### Bug Reports
Include the following information:
- **Description**: What happened vs. what you expected
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable
- **Error Messages**: Full error messages and stack traces

### Feature Requests
Include the following information:
- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: Any alternative solutions considered
- **Additional Context**: Screenshots, mockups, etc.

## 🎨 Design Guidelines

### Component Design
- **Single Responsibility**: Each component should have one clear purpose
- **Composition over Inheritance**: Favor composition patterns
- **Props Interface**: Clear, well-documented prop interfaces
- **Performance**: Use React.memo, useMemo, useCallback when appropriate

### State Management
- **Local State**: Use useState for component-specific state
- **Global State**: Use Redux for app-wide state
- **Server State**: Use RTK Query for server data
- **Derived State**: Avoid storing computed values in state

## 🔒 Security Guidelines

### Frontend Security
- **Input Validation**: Validate all user inputs
- **XSS Prevention**: Sanitize user-generated content
- **Authentication**: Properly handle JWT tokens
- **HTTPS**: Always use HTTPS in production

### Backend Security
- **Input Sanitization**: Clean all incoming data
- **Rate Limiting**: Implement rate limiting on all endpoints
- **Error Handling**: Don't expose sensitive information in errors
- **Dependencies**: Keep dependencies updated and secure

## 📚 Resources

### Helpful Links
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

### Code Style References
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🙏 Recognition

Contributors will be recognized in the README.md file and project documentation. We appreciate all forms of contributions, from code to documentation to issue reporting!

---

*Thank you for contributing to ShopSphere! Together, we're building something amazing.* 🚀