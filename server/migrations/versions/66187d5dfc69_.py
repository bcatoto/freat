"""empty message

Revision ID: 66187d5dfc69
Revises: 60f64f8e1be3
Create Date: 2019-12-24 11:18:01.942389

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66187d5dfc69'
down_revision = '60f64f8e1be3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('attendings_post_id_fkey', 'attendings', type_='foreignkey')
    op.drop_constraint('attendings_user_id_fkey', 'attendings', type_='foreignkey')
    op.create_foreign_key(None, 'attendings', 'users', ['user_id'], ['netid'], ondelete='CASCADE')
    op.create_foreign_key(None, 'attendings', 'postings', ['post_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'attendings', type_='foreignkey')
    op.drop_constraint(None, 'attendings', type_='foreignkey')
    op.create_foreign_key('attendings_user_id_fkey', 'attendings', 'users', ['user_id'], ['netid'])
    op.create_foreign_key('attendings_post_id_fkey', 'attendings', 'postings', ['post_id'], ['id'])
    # ### end Alembic commands ###
