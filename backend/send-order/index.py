import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправляет заявку на сборку ПК в Telegram @Upiter1488"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    build_name = body.get('build_name', '').strip()
    total_price = body.get('total_price', '').strip()
    components = body.get('components', [])

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '@Upiter1488'

    lines = [
        f"🖥 <b>Новая заявка на сборку ПК!</b>",
        f"",
        f"👤 <b>Имя:</b> {name}",
        f"📞 <b>Контакт:</b> {phone}",
    ]

    if build_name:
        lines.append(f"🏷 <b>Сборка:</b> {build_name}")

    if components:
        lines.append("")
        lines.append("🔧 <b>Комплектующие:</b>")
        for c in components:
            lines.append(f"  • {c['label']}: {c['name']} — {c['price']}")

    if total_price:
        lines.append("")
        lines.append(f"💰 <b>Итого:</b> {total_price}")

    text = "\n".join(lines)

    data = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode()

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
