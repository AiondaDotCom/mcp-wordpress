/**
 * Tests for TypeScript Build and Exports
 */

import { describe, it, expect } from '@jest/globals';

describe('TypeScript Build Tests', () => {
  describe('Module Exports', () => {
    it('should export MCPWordPressServer from main index', async () => {
      const indexModule = await import('../dist/index.js');
      expect(indexModule.MCPWordPressServer).toBeDefined();
      expect(typeof indexModule.MCPWordPressServer).toBe('function');
    });

    it('should export server compatibility module', async () => {
      const serverModule = await import('../dist/server.js');
      expect(serverModule.MCPWordPressServer).toBeDefined();
      expect(serverModule.default).toBeDefined();
    });

    it('should export debug utilities', async () => {
      const debugModule = await import('../dist/utils/debug.js');
      expect(debugModule.debug).toBeDefined();
      expect(debugModule.logger).toBeDefined();
      expect(debugModule.startTimer).toBeDefined();
      expect(debugModule.logError).toBeDefined();
    });

    it('should export WordPress API client', async () => {
      const apiModule = await import('../dist/client/api.js');
      expect(apiModule.WordPressClient).toBeDefined();
      expect(typeof apiModule.WordPressClient).toBe('function');
    });

    it('should export WordPress auth client', async () => {
      const authModule = await import('../dist/client/auth.js');
      expect(authModule.WordPressAuth).toBeDefined();
      expect(typeof authModule.WordPressAuth).toBe('function');
    });
  });

  describe('Tool Modules', () => {
    it('should export posts tools', async () => {
      const postsModule = await import('../dist/tools/posts.js');
      expect(postsModule.listPosts).toBeDefined();
      expect(postsModule.getPost).toBeDefined();
      expect(postsModule.createPost).toBeDefined();
      expect(postsModule.handleListPosts).toBeDefined();
      expect(postsModule.handleGetPost).toBeDefined();
      expect(postsModule.handleCreatePost).toBeDefined();
    });

    it('should export pages tools', async () => {
      const pagesModule = await import('../dist/tools/pages.js');
      expect(pagesModule.listPages).toBeDefined();
      expect(pagesModule.getPage).toBeDefined();
      expect(pagesModule.createPage).toBeDefined();
    });

    it('should export media tools', async () => {
      const mediaModule = await import('../dist/tools/media.js');
      expect(mediaModule.listMedia).toBeDefined();
      expect(mediaModule.getMedia).toBeDefined();
      expect(mediaModule.uploadMedia).toBeDefined();
    });

    it('should export users tools', async () => {
      const usersModule = await import('../dist/tools/users.js');
      expect(usersModule.listUsers).toBeDefined();
      expect(usersModule.getUser).toBeDefined();
      expect(usersModule.createUser).toBeDefined();
    });

    it('should export comments tools', async () => {
      const commentsModule = await import('../dist/tools/comments.js');
      expect(commentsModule.listComments).toBeDefined();
      expect(commentsModule.getComment).toBeDefined();
      expect(commentsModule.createComment).toBeDefined();
    });

    it('should export taxonomies tools', async () => {
      const taxonomiesModule = await import('../dist/tools/taxonomies.js');
      expect(taxonomiesModule.listCategories).toBeDefined();
      expect(taxonomiesModule.getCategory).toBeDefined();
      expect(taxonomiesModule.createCategory).toBeDefined();
      expect(taxonomiesModule.listTags).toBeDefined();
    });

    it('should export site tools', async () => {
      const siteModule = await import('../dist/tools/site.js');
      expect(siteModule.getSiteSettings).toBeDefined();
      expect(siteModule.updateSiteSettings).toBeDefined();
      expect(siteModule.getSiteStats).toBeDefined();
    });

    it('should export auth tools', async () => {
      const authModule = await import('../dist/tools/auth.js');
      expect(authModule.testAuth).toBeDefined();
      expect(authModule.getAuthStatus).toBeDefined();
      expect(authModule.startOAuthFlow).toBeDefined();
    });
  });

  describe('Type Definitions', () => {
    it('should export WordPress types', async () => {
      const wordpressModule = await import('../dist/types/wordpress.js');
      // Just verify the module loads without error
      expect(wordpressModule).toBeDefined();
    });

    it('should export MCP types', async () => {
      const mcpModule = await import('../dist/types/mcp.js');
      // Just verify the module loads without error
      expect(mcpModule).toBeDefined();
    });

    it('should export client types', async () => {
      const clientModule = await import('../dist/types/client.js');
      expect(clientModule.WordPressAPIError).toBeDefined();
      expect(clientModule.AuthenticationError).toBeDefined();
      expect(clientModule.RateLimitError).toBeDefined();
    });

    it('should export index types', async () => {
      const indexModule = await import('../dist/types/index.js');
      // Just verify the module loads without error
      expect(indexModule).toBeDefined();
    });
  });

  describe('Server Instantiation', () => {
    it('should be able to create MCPWordPressServer instance', async () => {
      const { MCPWordPressServer } = await import('../dist/index.js');
      
      const server = new MCPWordPressServer();
      expect(server).toBeDefined();
      expect(typeof server.run).toBe('function');
      expect(typeof server.shutdown).toBe('function');
      expect(typeof server.getStats).toBe('function');
    });

    it('should have correct tool and handler counts', async () => {
      const { MCPWordPressServer } = await import('../dist/index.js');
      
      const server = new MCPWordPressServer();
      const stats = server.getStats();
      
      expect(stats.toolsCount).toBe(54); // Expected number of tools
      expect(stats.handlersCount).toBe(54); // Expected number of handlers
      expect(stats.initialized).toBe(false); // Not initialized without WordPress connection
    });
  });

  describe('Error Classes', () => {
    it('should be able to create WordPressAPIError', async () => {
      const { WordPressAPIError } = await import('../dist/types/client.js');
      
      const error = new WordPressAPIError('Test error', 500, 'test_code');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('test_code');
    });

    it('should be able to create AuthenticationError', async () => {
      const { AuthenticationError } = await import('../dist/types/client.js');
      
      const error = new AuthenticationError('Auth failed', 'app-password');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Auth failed');
      expect(error.statusCode).toBe(401);
    });

    it('should be able to create RateLimitError', async () => {
      const { RateLimitError } = await import('../dist/types/client.js');
      
      const error = new RateLimitError('Rate limited', Date.now() + 60000);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Rate limited');
      expect(error.statusCode).toBe(429);
    });
  });
});