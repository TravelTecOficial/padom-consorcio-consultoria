#!/usr/bin/env node

/**
 * Script para criar repositório GitHub privado na CONTA TRAVELTECOFICIAL
 *
 * Uso: npm run deploy
 *
 * ⚠️ IMPORTANTE:
 * - Requer variável de ambiente: TRAVELTEC_GITHUB_TOKEN
 * - Token deve ser da conta TravelTecOficial (com permissão repo)
 * - Usuário não precisa fazer nada - tudo é automático!
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Token da TravelTecOficial (variável de ambiente)
const token = process.env.TRAVELTEC_GITHUB_TOKEN;

// Parse do nome do cliente
const args = process.argv.slice(2);
const cliente = args[0];

if (!cliente) {
  console.error('❌ Erro: nome do cliente não fornecido');
  console.error('Uso: npm run deploy:github -- "nome-cliente"');
  process.exit(1);
}

if (!token) {
  console.error('❌ Erro: Token da Traveltec não configurado');
  console.error('Configure a variável de ambiente:');
  console.error('  export TRAVELTEC_GITHUB_TOKEN="ghp_..."');
  process.exit(1);
}

const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Pasta dist/ não encontrada!');
  console.error('Execute: npm run build');
  process.exit(1);
}

const repoName = `landing-${cliente.toLowerCase().replace(/\s+/g, '-')}`;

console.log('🚀 Criando repositório GitHub privado...');
console.log(`📦 Repositório: ${repoName}`);

(async () => {
  try {
    // 1. Criar repositório na CONTA TRAVELTECOFICIAL
    console.log('📝 Criando repositório na conta TravelTecOficial...');
    const createRepoResponse = await fetch(`https://api.github.com/user/repos`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        name: repoName,
        description: `Landing Page - ${cliente}`,
        private: true,
        auto_init: true,
      }),
    });

    if (!createRepoResponse.ok) {
      const error = await createRepoResponse.json();
      throw new Error(`Erro GitHub API: ${error.message || error.errors?.[0]?.message || 'Erro desconhecido'}`);
    }

    const repoData = await createRepoResponse.json();
    const repoUrl = repoData.clone_url;

    console.log('✅ Repositório criado na TravelTecOficial!');
    console.log(`📍 URL: ${repoUrl}`);

    // 2. Inicializar git na pasta dist
    console.log('\n📂 Configurando git local...');

    try {
      execSync('git init', { cwd: distPath, stdio: 'pipe' });
    } catch (e) {
      // Pode já estar inicializado, ignorar
    }

    try {
      execSync(`git remote remove origin`, { cwd: distPath, stdio: 'pipe' });
    } catch (e) {
      // Pode não existir
    }

    execSync(`git remote add origin ${repoUrl}`, { cwd: distPath });
    execSync(`git config user.name "Claude Code"`, { cwd: distPath });
    execSync(`git config user.email "noreply@anthropic.com"`, { cwd: distPath });

    // 3. Adicionar todos os arquivos do dist
    console.log('📦 Adicionando arquivos de produção...');
    execSync(`git add .`, { cwd: distPath });

    // 4. Fazer commit
    console.log('💾 Fazendo commit...');
    try {
      execSync(`git commit -m "Deploy inicial - Landing Page ${cliente}"`, {
        cwd: distPath,
        stdio: 'pipe',
      });
    } catch (e) {
      // Pode não ter mudanças
      console.log('ℹ️  Nenhuma mudança para commitar');
    }

    // 5. Push para o repositório
    console.log('🚀 Enviando para GitHub...');
    execSync(`git branch -M main`, { cwd: distPath, stdio: 'pipe' });
    execSync(`git push -u origin main`, { cwd: distPath });

    console.log('\n✅ Repositório criado e enviado com sucesso!');
    console.log(`\n📍 Próximos passos:`);
    console.log(`1. Conecte em Hostinger via GitHub`);
    console.log(`2. Repositório privado: ${repoUrl}`);
    console.log(`3. Branch para deploy: main`);
    console.log(`4. Pasta pública: /`);

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
})();
