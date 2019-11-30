"""empty message

Revision ID: 781da34af53f
Revises: a5f730a2e155
Create Date: 2019-11-28 12:14:24.648030

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '781da34af53f'
down_revision = 'a5f730a2e155'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('netid', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('netid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###