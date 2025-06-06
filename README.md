# 🔌 MCP WordPress Server

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![WordPress](https://img.shields.io/badge/WordPress-5.6%2B-blue.svg)](https://wordpress.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A powerful **Model Context Protocol (MCP) server** that provides comprehensive WordPress management capabilities through natural language interactions. Manage your WordPress site using AI assistants like Claude, ChatGPT, or any MCP-compatible client.

## ✨ Features

### 📝 **Content Management**
- **Posts & Pages**: Full CRUD operations with rich content support
- **Media Library**: Upload, organize, and manage files with metadata
- **Revisions**: Track and manage content history
- **Bulk Operations**: Efficient batch processing

### 👥 **User & Access Management**
- **User Management**: Create, update, and manage WordPress users
- **Role-based Access**: Handle permissions and capabilities
- **Authentication**: Secure access with Application Passwords
- **Current User Info**: Get authenticated user details

### 💬 **Community Features**
- **Comments**: Moderate, approve, and manage user comments
- **Spam Protection**: Built-in spam detection and management
- **Comment Threading**: Handle nested comment structures

### 🏷️ **Content Organization**
- **Categories**: Hierarchical content organization
- **Tags**: Flexible content tagging system
- **Custom Taxonomies**: Support for custom classification systems

### ⚙️ **Site Administration**
- **Site Settings**: Configure WordPress core settings
- **Application Passwords**: Manage API access credentials
- **Site Statistics**: Get comprehensive site metrics
- **Search**: Full-text search across all content types

### 🔐 **Security & Authentication**
- **Multiple Auth Methods**: Application Passwords, OAuth, JWT
- **SSL Support**: Secure connections with certificate validation
- **Rate Limiting**: Built-in request throttling
- **Error Handling**: Comprehensive error management

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **WordPress 5.6+** with REST API enabled
- **Application Passwords** enabled (WordPress 5.6+)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mcp-wordpress.git
cd mcp-wordpress

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your WordPress credentials (see Configuration section)
nano .env

# Test the connection
npm run test:connection
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# WordPress Site Configuration
WORDPRESS_URL=https://your-site.com
WORDPRESS_USERNAME=your_admin_username
WORDPRESS_APP_PASSWORD=your_application_password

# Security Settings
NODE_TLS_REJECT_UNAUTHORIZED=0  # Set to 1 for production with valid SSL

# Development Settings
DEBUG=true                      # Enable debug logging
WORDPRESS_TIMEOUT=30000         # Request timeout in milliseconds
WORDPRESS_MAX_RETRIES=3         # Maximum retry attempts
```

### WordPress Setup

1. **Enable Application Passwords**:
   - Go to **Users → Your Profile** in WordPress admin
   - Scroll to **"Application Passwords"** section
   - Enter name: `MCP WordPress Server`
   - Click **"Add New Application Password"**
   - **Copy the generated password** (you won't see it again!)

2. **Verify REST API**:
   - Visit: `https://your-site.com/wp-json/wp/v2/`
   - Should return JSON with site information

## 🔧 Usage

### With Claude Desktop

Add this configuration to your Claude Desktop config file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "node",
      "args": ["/path/to/mcp-wordpress/src/index.js"],
      "env": {
        "WORDPRESS_URL": "https://your-site.com",
        "WORDPRESS_USERNAME": "your_username",
        "WORDPRESS_APP_PASSWORD": "your_application_password",
        "NODE_TLS_REJECT_UNAUTHORIZED": "0"
      }
    }
  }
}
```

### With Augment Code

1. **Go to Workspace Settings → Tools → MCP**
2. **Add new server**:
   - **Name**: `wordpress`
   - **Command**: `node /path/to/mcp-wordpress/src/index.js`
   - **Environment Variables**: (same as above)

### Standalone Server

```bash
# Start the MCP server
npm run start

# Start with debug logging
npm run dev

# Start specific version
node src/index.js          # Production version
node src/index-debug.js    # Debug version
```

## 🛠️ Available Tools (54 Total)

### 📝 Posts Management (6 tools)
- `wp_list_posts` - List WordPress posts with filtering
- `wp_get_post` - Get specific post details
- `wp_create_post` - Create new posts
- `wp_update_post` - Update existing posts
- `wp_delete_post` - Delete posts (trash/permanent)
- `wp_get_post_revisions` - Get post revision history

### 📄 Pages Management (6 tools)
- `wp_list_pages` - List WordPress pages
- `wp_get_page` - Get specific page details
- `wp_create_page` - Create new pages
- `wp_update_page` - Update existing pages
- `wp_delete_page` - Delete pages
- `wp_get_page_revisions` - Get page revision history

### 🖼️ Media Management (6 tools)
- `wp_list_media` - List media files with filtering
- `wp_get_media` - Get media file details
- `wp_upload_media` - Upload new media files
- `wp_update_media` - Update media metadata
- `wp_delete_media` - Delete media files
- `wp_get_media_sizes` - Get available image sizes

### 👥 User Management (6 tools)
- `wp_list_users` - List WordPress users
- `wp_get_user` - Get user details
- `wp_get_current_user` - Get current authenticated user
- `wp_create_user` - Create new users
- `wp_update_user` - Update user information
- `wp_delete_user` - Delete users

### 💬 Comments Management (7 tools)
- `wp_list_comments` - List comments with filtering
- `wp_get_comment` - Get comment details
- `wp_create_comment` - Create new comments
- `wp_update_comment` - Update comments
- `wp_delete_comment` - Delete comments
- `wp_approve_comment` - Approve pending comments
- `wp_spam_comment` - Mark comments as spam

### 🏷️ Taxonomy Management (10 tools)
- `wp_list_categories` - List categories
- `wp_get_category` - Get category details
- `wp_create_category` - Create new categories
- `wp_update_category` - Update categories
- `wp_delete_category` - Delete categories
- `wp_list_tags` - List tags
- `wp_get_tag` - Get tag details
- `wp_create_tag` - Create new tags
- `wp_update_tag` - Update tags
- `wp_delete_tag` - Delete tags

### ⚙️ Site Management (7 tools)
- `wp_get_site_settings` - Get WordPress site settings
- `wp_update_site_settings` - Update site configuration
- `wp_get_site_stats` - Get site statistics
- `wp_search_site` - Search across site content
- `wp_get_application_passwords` - List application passwords
- `wp_create_application_password` - Create new app passwords
- `wp_delete_application_password` - Delete app passwords

### 🔐 Authentication (6 tools)
- `wp_test_auth` - Test WordPress connection
- `wp_get_auth_status` - Get authentication status
- `wp_start_oauth_flow` - Start OAuth authentication
- `wp_complete_oauth_flow` - Complete OAuth flow
- `wp_refresh_oauth_token` - Refresh OAuth tokens
- `wp_switch_auth_method` - Switch authentication methods

## 💬 Example Conversations

Once connected to an AI assistant, you can use natural language:

```
"What are my latest WordPress posts?"
"Create a new blog post about AI and WordPress"
"Upload this image to my media library"
"Show me pending comments that need moderation"
"Update my site title and description"
"List all users with administrator roles"
"Search my site for posts about 'technology'"
```

## 🧪 Development & Testing

### Testing Commands

```bash
# Test WordPress connection and authentication
npm run test:connection

# Test all MCP tools functionality
npm run test:tools

# Check server status and configuration
npm run status

# Test specific site (for Laragon/local development)
npm run test:laragon
```

### Debug Mode

For development and troubleshooting:



# Test with debug output
DEBUG=true npm run test:connection
```

### Local Development (Laragon)

For local WordPress development with Laragon:

```env
WORDPRESS_URL=https://your-site.test
NODE_TLS_REJECT_UNAUTHORIZED=0
DEBUG=true
```

## 📁 Project Structure

```
mcp-wordpress/
├── src/
│   ├── index.js              # Main production server
│   ├── index-debug.js        # Debug version with logging
│   ├── client/
│   │   └── api.js           # WordPress REST API client
│   ├── tools/               # MCP tool definitions
│   │   ├── posts.js         # Posts management tools
│   │   ├── pages.js         # Pages management tools
│   │   ├── media.js         # Media management tools
│   │   ├── users.js         # User management tools
│   │   ├── comments.js      # Comments management tools
│   │   ├── taxonomies.js    # Categories & tags tools
│   │   ├── site.js          # Site management tools
│   │   └── auth.js          # Authentication tools
│   └── utils/
│       └── debug.js         # Debug logging utility
├── bin/                     # CLI utilities
├── test/                    # Test files
├── .env.example            # Environment template
├── package.json
└── README.md
```

## 🔧 Configuration Examples

### Production Environment

```env
WORDPRESS_URL=https://mysite.com
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
NODE_TLS_REJECT_UNAUTHORIZED=1
DEBUG=false
WORDPRESS_TIMEOUT=30000
```

### Development Environment

```env
WORDPRESS_URL=https://mysite.test
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
NODE_TLS_REJECT_UNAUTHORIZED=0
DEBUG=true
WORDPRESS_TIMEOUT=10000
```

### Laragon Local Development

```env
WORDPRESS_URL=https://saterembiga.test
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=your_app_password
NODE_TLS_REJECT_UNAUTHORIZED=0
DEBUG=true
```

## 🚨 Troubleshooting

### Common Issues

**Connection Refused**
```bash
# Check if WordPress site is accessible
curl -I https://your-site.com/wp-json/wp/v2/

# Test with debug mode
DEBUG=true npm run test:connection
```

**Authentication Failed**
- Verify Application Password is correct
- Check username is correct (not display name)
- Ensure Application Passwords are enabled

**SSL Certificate Issues**
```env
# For development/self-signed certificates
NODE_TLS_REJECT_UNAUTHORIZED=0

# For production with valid SSL
NODE_TLS_REJECT_UNAUTHORIZED=1
```

**MCP Connection Issues**
- Restart your MCP client (Claude Desktop, etc.)
- Check the server path in MCP configuration
- Verify environment variables are set correctly

### Debug Commands

```bash
# Comprehensive connection test
npm run test:connection

# Test individual components
node test-tools.js
node test-laragon.js

# Check server startup
DEBUG=true node src/index.js
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
git clone https://github.com/your-username/mcp-wordpress.git
cd mcp-wordpress
npm install
cp .env.example .env
# Configure .env with your test WordPress site
npm run test:connection
```

## 📊 Performance & Scalability

### Optimizations
- **Connection Pooling**: Efficient HTTP connection management
- **Request Caching**: Smart caching for frequently accessed data
- **Batch Operations**: Bulk processing for multiple items
- **Rate Limiting**: Respectful API usage

### Monitoring
- **Health Checks**: Built-in server health monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Request timing and success rates

## 🔒 Security Best Practices

### Authentication
- **Application Passwords**: Recommended for production
- **OAuth 2.0**: Enterprise-grade authentication
- **JWT Tokens**: Stateless authentication support

### Data Protection
- **HTTPS Only**: Encrypted connections required
- **Input Validation**: All inputs sanitized and validated
- **Error Sanitization**: Sensitive data never exposed in errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Model Context Protocol** - For the excellent MCP framework
- **WordPress REST API** - For comprehensive API access
- **Node.js Community** - For amazing ecosystem support
- **Laragon** - For excellent local development environment

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/mcp-wordpress/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/mcp-wordpress/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/mcp-wordpress/wiki)

## 🎯 Roadmap

### Upcoming Features
- **Custom Post Types**: Enhanced support for custom content
- **WooCommerce Integration**: E-commerce management tools
- **Multisite Support**: WordPress network management
- **Plugin Management**: Install and configure plugins
- **Theme Customization**: Advanced theme management
- **SEO Tools**: Built-in SEO optimization features

### Version History
- **v1.0.0** - Initial release with 54 WordPress tools
- **v1.1.0** - Enhanced error handling and debug features
- **v1.2.0** - Laragon support and local development tools

---

**Made with ❤️ for the WordPresscommunity**

*Transform your WordPress management experience with the power of AI!*
